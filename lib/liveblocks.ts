import { Liveblocks } from "@liveblocks/node"

const key = process.env.LIVEBLOCKS_PRIVATE_KEY;

if (!key) {
    throw new Error("LIVEBOLOCKS_PRIVAGTE_KEY IS NOT SET")
}
const liveblocks = new Liveblocks({ secret: key });
export default liveblocks