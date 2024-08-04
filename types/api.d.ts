declare type ApiResponseType<T extends any> =
   {
      status: "success" | "error";
      data?: T;
      message: string;
    }
