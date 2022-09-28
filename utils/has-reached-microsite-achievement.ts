export const hasReachedMicrositeAchievement = (
  achievements: string[]
): boolean => {
  return (
    achievements.indexOf(process.env.NEXT_PUBLIC_MICROSITE_ACHIEVEMENT_ID) > -1
  )
}
