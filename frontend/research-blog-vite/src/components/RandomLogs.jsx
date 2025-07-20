import React from 'react'
import LogCards from './LogCards';

const myLogsArray = [
    {
        title: "First Log",
        author: "Anand",
        date: "2025-07-16",
        category: "AI/ML",
        tags: ["Transformer", "Optimization"],
        status: "Active",
        body: "This is the first log...",
        imageUrl: "https://example.com/image1.png",
        referenceLinks: ["https://example.com"],
        likes: 8,
        dislikes: 3,
    },
    {
        title: "Second Log",
        author: "Anand",
        date: "2025-07-20",
        category: "Systems",
        tags: ["Gem5", "Optimization"],
        status: "Completed",
        body: "This is the second log...",
        imageUrl: "https://example.com/image1.png",
        referenceLinks: ["https://example.com"],
        likes: 6,
        dislikes: 2,
    }
];

export default function RandomLogs() {
  return (
    <LogCards logs={myLogsArray}/>
  )
}
