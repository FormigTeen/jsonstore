import { atomWithStorage } from "jotai/utils";

export const nameAtom = atomWithStorage<string>(
    'name',
    ""
)

export const zipAtom = atomWithStorage<string>(
    'zip',
    ""
)
