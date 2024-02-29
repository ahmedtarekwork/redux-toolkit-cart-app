type action<T extends string, P extends { id: string } | { id: string }[]> = {
  type: T;
  payload: P;
};

type FinalAction<P extends { id: string } | { id: string }[]> =
  | action<
      | "ADD_TO_LOCALSTORAGE"
      | "REMOVE_FROM_LOCALSTORAGE"
      | "EDIT_IN_LOCALSTORAGE",
      P
    >
  | action<"SET_LOCALSTORAGE", P>
  | {
      type: "REMOVE_LOCALSTORAGE";
    };

export default <P extends { id: string } | { id: string }[]>(
  keyName: string,
  action: FinalAction<P>
) => {
  const { type } = action;

  let finalArr = JSON.parse(localStorage.getItem(keyName) || "false") || [];

  switch (type) {
    case "REMOVE_LOCALSTORAGE": {
      localStorage.removeItem(keyName);
      break;
    }
    case "SET_LOCALSTORAGE": {
      localStorage.setItem(keyName, JSON.stringify(action.payload));
      break;
    }

    case "REMOVE_FROM_LOCALSTORAGE": {
      finalArr = finalArr.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) =>
          item.id !== (action.payload as unknown as { id: number }).id
      );

      localStorage.setItem(keyName, JSON.stringify(finalArr));
      break;
    }

    case "EDIT_IN_LOCALSTORAGE": {
      finalArr = finalArr.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => (item.id === action.payload ? action.payload : item)
      );

      localStorage.setItem(keyName, JSON.stringify(finalArr));
      break;
    }
    case "ADD_TO_LOCALSTORAGE": {
      finalArr.push(action.payload);
      localStorage.setItem(keyName, JSON.stringify(finalArr));
      break;
    }
  }
};
