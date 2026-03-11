"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateMatchScore(matchId: string, scoreA: string, scoreB: string, status: string, winner: string | null) {
  await prisma.match.update({
    where: { id: matchId },
    data: { scoreA, scoreB, status, winner }
  });
  revalidatePath("/fixtures");
  revalidatePath("/");
}

export async function createMatch(data: {
  sport: string;
  category: string;
  teamA: string;
  teamB: string;
  leagueFormat: string;
  time: Date;
  status: string;
  venue: string;
}) {
  await prisma.match.create({
    data
  });
  revalidatePath("/fixtures");
  revalidatePath("/");
}

export async function updateLeaderboard(team: string, gold: number, silver: number, points: number) {
  await prisma.leaderboard.update({
    where: { team },
    data: { gold, silver, points }
  });
  revalidatePath("/leaderboard");
  revalidatePath("/");
}
