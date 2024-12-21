import { allCollaborations, allFormations, recentcollaborations, recentFormations } from "@/actions/requetes";
import { prisma } from "@/util/db";
import { NextResponse } from "next/server";

export async function GET(req :Request) {
    const { queryType } = Object.fromEntries(new URL(req.url).searchParams);

    switch(queryType){
        case "all-formations":
            {
                const result = await allFormations();
                if (result.success) {
                    return NextResponse.json(result.data, { status: 200 });
                } else {
                    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
                }
            }
        case "all-collaborations":
            {
                const result = await allCollaborations();
                if (result.success) {
                    return NextResponse.json(result.data, { status: 200 });
                } else {
                    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
                }   
            }
        case "recent-formations":
            {
                const result = await recentFormations();
                if (result.success) {
                    return NextResponse.json(result.data, { status: 200 });
                } else {
                    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
                }   
            }
        case "recent-collaborations":
            {
                const result = await recentcollaborations();
                if (result.success) {
                    return NextResponse.json(result.data, { status: 200 });
                } else {
                    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
                }   
            }
        default :
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
