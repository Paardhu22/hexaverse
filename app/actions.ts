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
  await prisma.leaderboard.upsert({
    where: { team },
    update: { gold, silver, points },
    create: { team, gold, silver, points }
  });
  revalidatePath("/leaderboard");
  revalidatePath("/");
}

export async function bulkUpdateLeaderboard(data: { team: string, gold: number, silver: number, points: number }[]) {
  for (const item of data) {
    await prisma.leaderboard.upsert({
      where: { team: item.team },
      update: { gold: item.gold, silver: item.silver, points: item.points },
      create: { team: item.team, gold: item.gold, silver: item.silver, points: item.points }
    });
  }
  revalidatePath("/leaderboard");
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteMatch(matchId: string) {
  await prisma.match.delete({
    where: { id: matchId }
  });
  revalidatePath("/fixtures");
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteLeaderboard(team: string) {
  await prisma.leaderboard.delete({
    where: { team }
  });
  revalidatePath("/leaderboard");
  revalidatePath("/");
  revalidatePath("/admin");
}
