import { sources } from "./sources"
import { VT1Functions } from "./VT1/functions"

export const functions: Record<sources, typeof VT1Functions> = {
    VT1: VT1Functions,
}
