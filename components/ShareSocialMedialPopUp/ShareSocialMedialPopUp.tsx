import { Button } from "../button";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";
import PopUp from "../PopUp/PopUp";
import { useRef } from "react";
import { PopupActions } from "reactjs-popup/dist/types";

interface IShareSocialMedialPopUpProps
  extends React.HTMLAttributes<HTMLDivElement> {
  shareUrl: string;
  shareText: string;
}

export default function ShareSocialMedialPopUp(
  props: IShareSocialMedialPopUpProps
) {
  const popupRef = useRef<PopupActions | null>(null);
  return (
    <PopUp
      {...props}
      info="normal"
      trigger={
        <div>
          <BiLinkExternal
            onClick={(e) => {
              popupRef.current?.open();
              e.preventDefault();
            }}
            className="cursor-pointer hover:text-primary "
          />
        </div>
      }
      contents={
        <div className="flex flex-wrap justify-around">
          {/* twitter */}
          <Link
            target="_blank"
            href={`https://twitter.com/intent/tweet?text=${props.shareText}%0A%0A${props.shareUrl}`}
          >
            <Button>Share With Twitter</Button>
          </Link>
          {/* telegram */}
          <Link
            target="_blank"
            href={`https://telegram.me/share/url?url=${props.shareUrl}%0A&text=${props.shareText}`}
          >
            <Button>Share With Telegram</Button>
          </Link>
        </div>
      }
    />
  );
}
