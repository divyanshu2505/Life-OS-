"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { SendHorizonal } from "lucide-react";
import { request } from "../lib/api";
import { formatDateTime } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SectionCard } from "./ui/section-card";

export function ChatPanel({ bookingId }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    request("get", `/chat/${bookingId}/messages`)
      .then((response) => {
        setMessages(response.messages);
        setReady(true);
      })
      .catch((requestError) => {
        setError(requestError.response?.data?.message || "Unable to load chat right now.");
      });
  }, [bookingId]);

  useEffect(() => {
    if (!ready) {
      return undefined;
    }

    const token = window.localStorage.getItem("companion-circle-token");
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
      auth: { token }
    });

    socket.emit("booking:join", bookingId);
    socket.on("chat:message", (message) => {
      setMessages((current) => [...current, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [bookingId, ready]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (event) => {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    try {
      await request("post", `/chat/${bookingId}/messages`, { content });
      setContent("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to send the message.");
    }
  };

  return (
    <SectionCard className="flex h-[70vh] flex-col">
      <div className="border-b border-black/10 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rosewood">
          Session chat
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Stay warm, respectful, and within platform rules</h2>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto py-5">
        {messages.map((message) => (
          <div key={message._id} className="rounded-3xl bg-white/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{message.sender?.email}</p>
              <p className="text-xs text-black/50">{formatDateTime(message.createdAt)}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-black/75">{message.content}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {error ? <p className="pb-3 text-sm text-rosewood">{error}</p> : null}

      <form className="flex gap-3 border-t border-black/10 pt-4" onSubmit={handleSend}>
        <Input
          placeholder="Write a message..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <Button type="submit" className="gap-2">
          <SendHorizonal className="h-4 w-4" />
          Send
        </Button>
      </form>
    </SectionCard>
  );
}
