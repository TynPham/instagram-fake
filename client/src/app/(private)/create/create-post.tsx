/* eslint-disable react/no-unescaped-entities */
"use client";

import mediaApi from "@/apis/media.api";
import postsApi from "@/apis/posts.api";
import { upload_media } from "@/assets/images";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn, handleErrorApi } from "@/lib/utils";
import { AppContext, AppContextType } from "@/provider/app.provider";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowLeft } from "react-icons/hi";
import { z } from "zod";

const formSchema = z.object({
  captions: z.string().optional(),
  media: z.string().url(),
});

export function CreatePost() {
  const { user } = useContext<AppContextType>(AppContext);
  const [file, setFile] = useState<File | null>(null);
  const mediaRef = useRef<HTMLInputElement | null>(null);
  const dialogCloseRef = useRef<any>(null);
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      captions: "",
      media: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("image", file as Blob);
      const res = await mediaApi.uploadImage(formData);
      const medias = res.payload.result;
      const createPostRes = await postsApi.createPost({ captions: values.captions, medias });
      toast({
        description: createPostRes.payload.message,
      });
      handleReset();
      handleDialogClose();
      window.location.reload();
      router.refresh();
    } catch (error) {
      handleErrorApi(error, form.setError);
    }
  }

  const handlePrev = () => {
    handleReset();
  };

  const handleReset = () => {
    setFile(null);
    mediaRef.current?.value && (mediaRef.current.value = "");
    form.reset();
  };

  const handleDialogClose = () => {
    dialogCloseRef.current?.click();
  };

  return (
    <DialogContent
      className={cn("h-[80%] !rounded-xl p-0 flex flex-col overflow-hidden dialog-post gap-0", {
        "max-w-[700px]": !file,
        "max-w-[1000px]": file,
      })}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col">
          <DialogHeader className="justify-between items-center flex-row p-4 border-b-[0.5px] border-zinc-400">
            {file && <HiArrowLeft className="w-6 h-6 cursor-pointer" onClick={handlePrev} />}
            <DialogTitle className="!mt-0 text-center w-full">Create new post</DialogTitle>
            {file && (
              <Button type="submit" variant="outline" className="border-none hover:bg-transparent !mt-0">
                <h3 className="text-blue-500 cursor-pointer">Share</h3>
              </Button>
            )}
          </DialogHeader>
          <div className="flex-1 relative">
            {!file && (
              <div className="flex justify-center items-center flex-col gap-2 h-full">
                <Image src={upload_media} alt="upload" />
                <p className="text-xl">Drag photos and videos here</p>
                <div className="relative mt-2">
                  <Button type="button" className="">
                    Select from computer
                  </Button>
                  <FormField
                    control={form.control}
                    name="media"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                            accept="image/*"
                            type="file"
                            ref={mediaRef}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setFile(file);
                                field.onChange("http://localhost:3000/api/media/upload/" + file.name);
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            {file && (
              <div className="absolute inset-0 z-20 flex">
                <div className="max-w-[700px] border-r-[0.5px] border-zinc-400">
                  <Image src={URL.createObjectURL(file)} alt="preview" width={200} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="w-full max-w-[300px] p-4 flex flex-col gap-4">
                  <div className="text-sm flex gap-2 items-center">
                    <Avatar className="w-8 h-8 group-hover:scale-110 transition-all">
                      <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                    </Avatar>
                    <span className="font-bold">{user?.username}</span>
                  </div>
                  <FormField
                    control={form.control}
                    name="captions"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Textarea
                            placeholder="Write a caption..."
                            className="w-full border-none resize-none focus-within:!ring-0 focus-within:!ring-offset-0 p-0 min-h-full"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </Form>
      <DialogFooter className="invisible">
        <DialogClose ref={dialogCloseRef} asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
