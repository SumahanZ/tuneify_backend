export const customID = (
  alphabet: string = "abcdefghijklmnopqrstuvwxyz0123456789",
  defaultSize: number = 10
) => {
  let id = "";
  let i = defaultSize;
  while (i--) {
    id += alphabet[(Math.random() * alphabet.length) | 0];
  }
  return id;
};
