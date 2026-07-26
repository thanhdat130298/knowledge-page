"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { useState } from "react";

export default function ProfileSettingsPage() {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      // TODO: Server Action persist profile
      toast({
        title: "Đã lưu hồ sơ",
        variant: "success",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 md:px-6">
      <h1 className="font-display text-3xl font-semibold">Cài đặt hồ sơ</h1>
      <form className="mt-6 space-y-4" onSubmit={save}>
        <div>
          <label className="mb-1 block text-sm" htmlFor="username">
            Username
          </label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
            disabled={saving}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm" htmlFor="display">
            Display name
          </label>
          <Input
            id="display"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={saving}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm" htmlFor="bio">
            Bio
          </label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={500}
            disabled={saving}
          />
        </div>
        <p className="text-xs text-muted">Email không hiển thị công khai.</p>
        <Button type="submit" loading={saving}>
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </form>
    </div>
  );
}
