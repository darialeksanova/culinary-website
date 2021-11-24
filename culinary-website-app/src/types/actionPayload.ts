export type ActionPayload<TType, PType> = {
  type: TType;
  payload: PType;
};