import { Injectable } from '@angular/core';
import { Message } from './message';
import { UserService } from './user.service';
import { DataService } from './data.service';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  private nextId = 1;

  constructor(
    private userService: UserService,
    private dataService: DataService
  ) {
    const stored = localStorage.getItem('messages');
    this.messages = stored ? JSON.parse(stored) : [];
    this.nextId =
      this.messages.length > 0
        ? Math.max(...this.messages.map((m) => m.id)) + 1
        : 1;
  }

  getMessagesForUser(userId: number): Message[] {
    return this.messages.filter(
      (m) => m.senderId === userId || m.recipientId === userId
    );
  }

  getMessagesBetweenUsers(userId1: number, userId2: number): Message[] {
    return this.messages.filter(
      (m) =>
        (m.senderId === userId1 && m.recipientId === userId2) ||
        (m.senderId === userId2 && m.recipientId === userId1)
    );
  }

  sendMessage(
    senderId: number,
    recipientId: number,
    postId: number,
    content: string
  ) {
    const newMessage: Message = {
      id: this.nextId++,
      senderId,
      recipientId,
      postId,
      content,
      timestamp: new Date().toISOString(),
    };
    this.messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }

  getAllMessages(): Message[] {
    return this.messages;
  }

  resetMessages() {
    this.messages = [];
    this.nextId = 1;
    localStorage.removeItem('messages');
  }

  getThreadsForOwner(ownerId: number) {
    const ownerPosts: Post[] = this.dataService
      .getAllPosts()
      .filter((post: Post) => post.userId === ownerId);
    const relevantPostIds = new Set(ownerPosts.map((p) => p.id));

    const threadsMap = new Map<string, Message>();

    for (const msg of this.messages) {
      if (!relevantPostIds.has(msg.postId)) continue;

      const otherUserId =
        msg.senderId === ownerId ? msg.recipientId : msg.senderId;
      const key = `${otherUserId}-${msg.postId}`;

      const existing = threadsMap.get(key);
      if (!existing || new Date(msg.timestamp) > new Date(existing.timestamp)) {
        threadsMap.set(key, msg);
      }
    }

    const threads = Array.from(threadsMap.entries()).map(([key, msg]) => {
      const [otherUserId, postId] = key.split('-').map(Number);
      const otherUser = this.userService
        .getAllUsers()
        .find((u) => u.id === otherUserId);
      const post = this.dataService.getPostById(postId);

      return {
        otherUserId,
        otherUserName: otherUser?.username || 'Unknown',
        postId,
        propertyTitle: post?.title || 'Listing',
        location: post?.location || '',
        lastMessage: msg.content,
        timestamp: msg.timestamp,
      };
    });

    return threads.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  getThreadsForUser(userId: number) {
    const threadsMap = new Map<string, Message>();

    for (const msg of this.messages) {
      if (msg.senderId !== userId && msg.recipientId !== userId) continue;

      const otherUserId =
        msg.senderId === userId ? msg.recipientId : msg.senderId;
      const key = `${otherUserId}-${msg.postId}`;

      const existing = threadsMap.get(key);
      if (!existing || new Date(msg.timestamp) > new Date(existing.timestamp)) {
        threadsMap.set(key, msg);
      }
    }

    const threads = Array.from(threadsMap.entries()).map(([key, msg]) => {
      const [otherUserId, postId] = key.split('-').map(Number);
      const otherUser = this.userService
        .getAllUsers()
        .find((u) => u.id === otherUserId);
      const post = this.dataService.getPostById(msg.postId);

      return {
        otherUserId,
        otherUserName: otherUser?.username || 'Unknown',
        postId: msg.postId,
        propertyTitle: post?.title || 'Listing',
        location: post?.location || '',
        lastMessage: msg.content,
        timestamp: msg.timestamp,
      };
    });

    return threads.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
}
