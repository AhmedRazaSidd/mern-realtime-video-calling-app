import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser'
import { useQuery } from '@tanstack/react-query'
import { getStreamToken } from '../lib/api'
import { StreamChat } from "stream-chat";
import { toast } from "react-toastify";
import ChatLoader from '../components/ChatLoader'
import {
    Chat,
    Channel,
    ChannelList,
    Window,
    ChannelHeader,
    MessageList,
    MessageInput,
    Thread,
    useCreateChatClient,
} from "stream-chat-react";
import CallButton from '../components/CallButton'

const STEAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;


const Chats = () => {

    const { id: targetUserid } = useParams()
    const [chatClient, setChatClient] = useState(null);
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);

    const { authUser } = useAuthUser();

    const { data: tokenData } = useQuery({
        queryKey: ['streamToken'],
        queryFn: getStreamToken,
        enabled: !!authUser // This will run only when authUser is available
    });

    useEffect(() => {
        const initChat = async () => {
            if (!tokenData?.token || !authUser) return
            try {
                console.log('Initializing stream chat client...')

                const client = StreamChat.getInstance(STEAM_API_KEY);

                await client.connectUser({
                    id: authUser._id,
                    name: authUser.fullName,
                    image: authUser.profilePic
                }, tokenData.token);

                const channelId = [authUser._id, targetUserid].sort().join('-');

                const currChannel = client.channel('messaging', channelId, {
                    members: [authUser._id, targetUserid]
                });

                await currChannel.watch();

                setChatClient(client);
                setChannel(currChannel);

            } catch (error) {
                console.error('Error initializing chat:', error);
                toast.error('Could not connect to chat. please try again.');
            } finally {
                setLoading(false);
            }
        };

        initChat();
    }, [])

    const handleVideoCall = () => {
        if (channel) {

            const callUrl = `${window.location.origin}/call/${channel.id}`;
            channel.sendMessage({
                text: `I've started a video call. Join me here: ${callUrl}`
            })
            toast.success('Video call link send successfully!')
        }
    }

    if (loading || !chatClient || !channel) return <ChatLoader />

    return (
        <div className='h-[93vh] w-full'>
            <Chat client={chatClient}>
                <Channel channel={channel}>
                    <div className='w-full relative'>
                        <CallButton handleVideoCall={handleVideoCall} />
                        <Window>
                            <ChannelHeader />
                            <MessageList />
                            <MessageInput focus />
                        </Window>
                    </div>
                    <Thread />
                </Channel>
            </Chat>
        </div>
    )
}

export default Chats