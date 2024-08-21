import { Textarea } from "@nextui-org/react";
import { Button } from "@/components/button";
import { CommentCard } from "../CommentCard/CommentCard";
import CardContianer from "@/components/CardContianer/CardContianer";
import Image from "next/image";
import { trpcClient } from "@/lib/trpc";
import { wallet } from "@/services/wallet";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Row, RowList } from "postgres";
import LoadingDisplay from "@/components/LoadingDisplay/LoadingDisplay";
import { after, before, set } from "lodash";

interface DiscussionAreaProps {
  pair: FtoPairContract;
}

export function DiscussionArea(props: DiscussionAreaProps) {
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState<
    {
      id: number;
      project_id: number;
      commenter: string;
      comment: string;
      is_owner: boolean;
      parent_comment_id: number | null;
      created_at: Date;
      updated_at: Date;
    }[]
  >([]);
  const [state, setState] = useState({
    loadingComments: true,
    commenting: false,
    noMoreToLoad: false,
    loadingMore: false,
  });

  useEffect(() => {
    if (!props.pair.databaseId) return;
    startFetchComments();
  }, [props.pair.databaseId]);

  const startFetchComments = async () => {
    const res = await trpcClient.discussionRouter.getCommentsByProjectId.query({
      project_id: props.pair.databaseId ?? -1,
      limit: 10,
    });

    if (res) {
      setComments(res);
      setState({
        ...state,
        loadingComments: false,
        noMoreToLoad: res.length < 10,
      });
      continueFetchComments(res?.[0]?.id ?? 0);
    }
  };

  const continueFetchComments = async (afterId: number) => {
    const res = await trpcClient.discussionRouter.getCommentsByProjectId.query({
      project_id: props.pair.databaseId ?? -1,
      afterId: afterId,
    });

    if (res && res.length > 0) {
      setComments((prev) => {
        const newArr = [...res, ...prev];
        return newArr;
      });
    }

    setTimeout(() => {
      if (window.location.pathname !== `/launch-detail/${props.pair.address}`)
        return;
      continueFetchComments(res?.[0]?.id ?? afterId);
    }, 2000);
  };

  const loadMoreComments = async () => {
    if (state.noMoreToLoad) return;
    setState({
      ...state,
      loadingMore: true,
    });
    const res = await trpcClient.discussionRouter.getCommentsByProjectId.query({
      project_id: props.pair.databaseId ?? -1,
      beforeId: comments[comments.length - 1].id,
    });

    if (res && res.length > 0) {
      setComments((prev) => {
        const newArr = [...prev, ...res];
        return newArr;
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          noMoreToLoad: true,
        };
      });
    }

    setState((prev) => {
      return {
        ...prev,
        loadingMore: false,
      };
    });
  };

  return (
    <CardContianer>
      <div className="flex-col w-full">
        <h2 className="text-[2rem] font-bold">Discussion Board</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] w-full min-h-[300px] justify-center items-center">
          <Textarea
            maxRows={15}
            label="Leave a Comment!"
            classNames={{
              base: "w-full h-full bg-[#2F200B]",
              innerWrapper: "w-full h-full ",
              inputWrapper: "w-full !h-full bg-[#2F200B] hover:bg-[#2F200B]",
              input: "w-full h-full",
              mainWrapper: "w-full h-full bg-[#2F200B] hover:bg-[#2F200B]",
              label: "text-[#FFCD4D] text-base font-bold leading-[normal]",
            }}
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          ></Textarea>
          <div className="flex gap-2 flex-col pl-5 justify-around items-center h-full">
            <Image
              className="hidden lg:block w-[200px]"
              src={"/images/bera/smoking_bera.png"}
              width={200}
              height={200}
              alt=""
            ></Image>{" "}
            <Button
              isDisabled={state.commenting}
              isLoading={state.commenting}
              onClick={async () => {
                if (!wallet.account) {
                  toast.warn("Please connect your wallet");
                  return;
                }

                if (userComment.length === 0) {
                  toast.warn("Comment can not be empty");
                  return;
                }

                setState({
                  ...state,
                  commenting: true,
                });

                const res =
                  await trpcClient.discussionRouter.createComment.mutate({
                    project_id: props.pair.databaseId ?? -1,
                    commenter: wallet.account,
                    comment: userComment,
                    is_owner: false,
                    parent_comment_id: undefined,
                  });

                if (res) {
                  setUserComment("");
                  toast.success("Comment successfully");
                } else {
                  toast.error("Failed to comment");
                }

                setState({
                  ...state,
                  commenting: false,
                });
              }}
            >
              Comment
            </Button>
          </div>
        </div>
        {state.loadingComments ? (
          <div className="w-full my-5">
            <LoadingDisplay />
          </div>
        ) : (
          <div className="w-full my-2">
            {/** comment cards */}
            {comments?.map((comment) => (
              <CommentCard
                key={comment.id}
                commenterImageURL="/images/bera/smoking_bera.png"
                commenterName={comment.commenter}
                commentDate={new Date(comment.created_at)}
                comment={comment.comment}
              />
            ))}
          </div>
        )}
        {!state.noMoreToLoad && !state.loadingComments && (
          <div className="w-full flex justify-center items-center">
            <Button isLoading={state.loadingMore} onClick={loadMoreComments}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </CardContianer>
  );
}
