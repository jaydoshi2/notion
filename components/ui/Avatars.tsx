"use client"
import React from 'react'
import { useOthers, useSelf } from '@liveblocks/react/suspense'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from './tooltip'

const Avatars = () => {
    const others = useOthers()
    const self = useSelf()

    const all = [self, ...others]

    return (
        <div className="flex gap-1 items-center">
            <p className="font-light text-sm">
                Users currently editing this page:
            </p>
            <div className="flex -space-x-4">
                {all.map((other, i) => (
                    <TooltipProvider key={other?.id || i}>
                        <Tooltip>
                            <TooltipTrigger>
                                <Avatar className="border-2 hover:z-50">
                                    <AvatarImage src={other?.info?.avatar} />
                                    <AvatarFallback>
                                        {other?.info?.name || "User"}
                                    </AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                <Avatar className="border-2 hover:z-50">
                                    <AvatarImage src={other?.info?.avatar} />
                                    <AvatarFallback>
                                        {other?.info?.name || "User"}
                                    </AvatarFallback>
                                </Avatar>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>
        </div>
    )
}

export default Avatars
