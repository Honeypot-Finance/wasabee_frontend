import Image from "next/image";
import { Button as NextButton } from "@nextui-org/react";
import { motion } from "framer-motion";
import { itemSlideVariants } from "@/lib/animation";

interface CommentCardProps {
  commenterImageURL: string;
  commenterName: string;
  commentDate: Date;
  comment: string;
}

export function CommentCard(props: CommentCardProps) {
  return (
    <motion.div
      variants={itemSlideVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-3 my-2 p-2 bg-slate-50/10 rounded-md"
    >
      <div className="flex gap-2">
        <Image
          src={props.commenterImageURL}
          width={50}
          height={50}
          alt="bera"
        ></Image>
        <div className="flex flex-col gap-1 overflow-hidden overflow-ellipsis break-words text-nowrap">
          <div className="text-[#FFCD4D] text-base font-bold leading-[normal]">
            {props.commenterName}
          </div>
          <div className="text-[rgba(255,255,255,0.66)] text-sm font-medium leading-[normal]">
            {props.commentDate.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="text-[rgba(255,255,255,0.66)] text-base font-normal leading-[normal]">
        {props.comment}
      </div>
      {/* <div className="flex justify-between items-center">
        <h3 className="pl-2 underline cursor-pointer">Show replies</h3>
        <NextButton>reply</NextButton>
      </div> */}
    </motion.div>
  );
}
