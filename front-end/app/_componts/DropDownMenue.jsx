"use client";

import { useState } from "react";

import { PencilIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// this an alert dialog component for delete
import AlertDialogDestructive from "./AlertDialog";

// this an form to edit review
import CommentsForm from "./CommentsForm";

export default function DropdownMenuDestructive(props) {
  const [open, setOpen] = useState(false);

  const [showCommentForm, setShowCommentForm] = useState(false);

  return (
    <>
      <DropdownMenu className="cursor-pointer">
        <DropdownMenuTrigger render={<Button>{props.title}</Button>} />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setShowCommentForm(true)}>
              <PencilIcon />
              تعديل
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setOpen(true)}
            >
              <TrashIcon />
              حذف
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogDestructive
        open={open}
        setOpen={setOpen}
        id={props.review._id}
      />
      {showCommentForm && (
        <div className="fixed inset-0 bg-gray-300/50 w-full h-full flex justify-center items-center">
          <CommentsForm
            setShowCommentForm={setShowCommentForm}
            review={props.review}
          />
        </div>
      )}
    </>
  );
}
