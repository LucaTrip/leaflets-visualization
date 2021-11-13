export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload?: M[Key];
      };
};

export enum Types {
  change_offset = "changeOffset",
  change_limit = "changeLimit",
  change_name = "changeName",
  change_validation = "changeValidation",
  change_max_distance = "changeMaxDistance",
  change_sort = "changeSort",
}
