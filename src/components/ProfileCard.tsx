import type { Profile } from "@/types";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-xl shadow-pink-100">
      {/* Profile photo */}
      <div className="relative h-[420px] w-full bg-pink-50">
        <img
          src={profile.photo}
          alt={`${profile.name}'s profile`}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

        <div className="absolute bottom-5 left-5 text-white">
          <h2 className="text-3xl font-bold">
            {profile.name}, {profile.age}
          </h2>
          <p className="mt-1 text-sm text-white/90">
            📍 {profile.city}
          </p>
        </div>
      </div>

      {/* Profile details */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="mb-2 font-semibold text-gray-800">
            About me
          </h3>
          <p className="text-sm leading-relaxed text-gray-600">
            {profile.bio}
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-gray-800">
            Interests
          </h3>

          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-pink-50 px-3 py-1.5 text-xs font-medium text-pink-600"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
