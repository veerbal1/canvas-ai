'use client'; // Required for hooks like useState, useRef, useEffect

import React, { useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const Chatbot: React.FC = () => {
    const { messages, input, handleInputChange, handleSubmit, status } = useChat({
        // api: '/api/chat' // Default endpoint, adjust if needed
    });

    const messageContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages update
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Card className="w-full h-full flex flex-col overflow-hidden">
            <CardContent ref={messageContainerRef} className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((m) => (
                        <div
                            key={m.id}
                            className={cn(
                                'flex flex-col space-y-1',
                                m.role === 'user' ? 'items-end' : 'items-start'
                            )}
                        >
                            <div
                                className={cn(
                                    'px-4 py-2 rounded-lg max-w-[80%]',
                                    m.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted'
                                )}
                            >
                                <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="p-4 border-t flex-shrink-0">
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                        disabled={status === 'streaming'}
                        className="flex-grow"
                    />
                    <Button type="submit" disabled={status === 'streaming'}>
                        {status === 'streaming' ? (
                            <span className="animate-spin mr-2">⏳</span>
                        ) : null}
                        Send
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
};