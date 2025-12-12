"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import css from "./ShareButton.module.css";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title,
      text: text || title,
      url: url || window.location.href,
    };

    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error);
          fallbackShare(shareData.url);
        }
      } finally {
        setIsSharing(false);
      }
    } else {
      fallbackShare(shareData.url);
    }
  };

  const fallbackShare = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <button
      onClick={handleShare}
      className={css.shareButton}
      disabled={isSharing}
      aria-label="Share this page"
      type="button"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08259 9.19211C7.54305 8.46595 6.71937 8 5.8 8C4.14315 8 3 9.34315 3 11C3 12.6569 4.14315 14 5.8 14C6.71937 14 7.54305 13.5341 8.08259 12.8079L15.0227 16.6294C15.0077 16.7508 15 16.8745 15 17C15 18.6569 16.3431 20 18 20C19.6569 20 21 18.6569 21 17C21 15.3431 19.6569 14 18 14C17.0806 14 16.2569 14.4659 15.7174 15.1921L8.77733 11.3706C8.79229 11.2492 8.8 11.1255 8.8 11C8.8 10.8745 8.79229 10.7508 8.77733 10.6294L15.7174 6.80789C16.2569 7.53405 17.0806 8 18 8Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Share</span>
    </button>
  );
}
