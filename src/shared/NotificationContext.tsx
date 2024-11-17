import React, { createContext, useEffect, useRef, useState } from 'react'

// Define the shape of the WebSocket message
interface WebSocketMessage {
	topic: string
	payload: any
}

// Define the Notification context value type
interface NotificationContextValue<T> {
	subscribeToTopic: (topic: string, callback: (msg: T) => void) => void
}

// Define the props for the NotificationProvider component
interface NotificationProviderProps<TUser> {
	channel?: string
	children: React.ReactNode
	url: string
	user: TUser | null
}

// Create a strongly typed NotificationContext
export const NotificationContext = createContext<NotificationContextValue<any>>(
	{
		subscribeToTopic: () => {
			throw new Error(
				'subscribeToTopic must be used within a NotificationProvider.'
			)
		}
	}
)

export const NotificationProvider = <TUser extends { userId?: string }>({
	channel,
	children,
	url,
	user
}: NotificationProviderProps<TUser>) => {
	const subscriptions = useRef<{ [topic: string]: (msg: any) => void }>({})
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [ws, setWs] = useState<WebSocket | null>(null)
	const reconnectAttempts = useRef<number>(0)
	const reconnectInterval = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (!user && !channel) {
			return
		}

		const accessToken = localStorage.getItem('access_token')
		const websocketChannel = channel || user?.userId

		function connectWebSocket() {
			if (ws) {
				ws.close()
			}

			if (websocketChannel && accessToken && !isConnected) {
				const newWs = new WebSocket(
					`${url}/ws/${websocketChannel}?token=${accessToken}`
				)

				newWs.onopen = () => {
					console.log('WebSocket connection established.')
					setIsConnected(true)
					reconnectAttempts.current = 0
				}

				newWs.onmessage = (event) => {
					const message = JSON.parse(event.data) as WebSocketMessage
					const callback = subscriptions.current[message.topic]

					if (callback) {
						callback(message.payload)
					}
				}

				newWs.onerror = (error) => {
					console.error('WebSocket error:', error)
					setIsConnected(false)
					attemptReconnect()
				}

				newWs.onclose = () => {
					console.log('WebSocket connection closed.')
					setIsConnected(false)
					attemptReconnect()
				}

				setWs(newWs)
			}
		}

		function attemptReconnect() {
			if (reconnectAttempts.current < 5) {
				reconnectAttempts.current += 1
				const timeout = setTimeout(() => {
					console.log(
						`Attempting to reconnect... (${reconnectAttempts.current})`
					)
					connectWebSocket()
				}, 2000)
				reconnectInterval.current = timeout
			} else {
				console.log('Max reconnect attempts reached.')
			}
		}

		connectWebSocket()

		return () => {
			if (ws) {
				ws.close()
			}
			if (reconnectInterval.current) {
				clearTimeout(reconnectInterval.current)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, channel])

	const subscribeToTopic = (topic: string, callback: (msg: any) => void) => {
		subscriptions.current[topic] = callback
	}

	return (
		<NotificationContext.Provider value={{ subscribeToTopic }}>
			{children}
		</NotificationContext.Provider>
	)
}
