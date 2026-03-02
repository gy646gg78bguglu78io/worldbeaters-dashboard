"use client";

import { useState } from "react";

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
        enabled ? "bg-accent" : "bg-card-border"
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
          enabled ? "left-5.5" : "left-0.5"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
    marketing: false,
    security: true,
  });
  const [profile, setProfile] = useState({
    name: "Chris B.",
    email: "chris@worldbeaters.com",
    role: "Administrator",
    company: "WorldBeaters Inc.",
    timezone: "UTC-8 (Pacific Time)",
  });
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "appearance", label: "Appearance", icon: "🎨" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  return (
    <main className="flex-1 p-8 ml-64 min-h-screen">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-muted mt-1">Manage your account preferences.</p>
      </div>

      <div className="flex gap-8">
        {/* Settings Nav */}
        <div className="w-56 shrink-0 animate-slide-in-left" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Profile Information</h3>
                {/* Avatar */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-accent/20">
                    CB
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/80 transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-xs text-muted mt-2">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(profile).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-muted mb-2 capitalize">{key}</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                        className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-card border border-card-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                {[
                  { key: "email" as const, title: "Email Notifications", desc: "Receive order updates and alerts via email" },
                  { key: "push" as const, title: "Push Notifications", desc: "Get instant notifications in your browser" },
                  { key: "weekly" as const, title: "Weekly Digest", desc: "Receive a weekly summary of activity" },
                  { key: "marketing" as const, title: "Marketing Emails", desc: "Product announcements and special offers" },
                  { key: "security" as const, title: "Security Alerts", desc: "Login attempts and security notifications" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-lg hover:bg-white/[0.02] transition-colors">
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle
                      enabled={notifications[item.key]}
                      onChange={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "dark", label: "Dark", gradient: "from-slate-900 to-slate-800", textColor: "text-white" },
                    { id: "light", label: "Light", gradient: "from-white to-gray-100", textColor: "text-gray-800" },
                    { id: "midnight", label: "Midnight", gradient: "from-indigo-950 to-purple-950", textColor: "text-white" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        theme === t.id ? "border-accent shadow-lg shadow-accent/20 scale-105" : "border-card-border hover:border-accent/30"
                      }`}
                    >
                      <div className={`h-28 bg-gradient-to-br ${t.gradient} p-4`}>
                        <div className={`text-sm font-bold ${t.textColor}`}>{t.label}</div>
                        <div className="mt-2 space-y-1.5">
                          <div className={`h-2 w-3/4 rounded ${t.id === "light" ? "bg-gray-300" : "bg-white/20"}`} />
                          <div className={`h-2 w-1/2 rounded ${t.id === "light" ? "bg-gray-200" : "bg-white/10"}`} />
                        </div>
                      </div>
                      {theme === t.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white text-xs">✓</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Language</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { code: "en", label: "English", flag: "🇬🇧" },
                    { code: "es", label: "Espa\u00f1ol", flag: "🇪🇸" },
                    { code: "fr", label: "Fran\u00e7ais", flag: "🇫🇷" },
                    { code: "de", label: "Deutsch", flag: "🇩🇪" },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        language === lang.code ? "border-accent bg-accent/10" : "border-card-border hover:border-accent/30"
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span className={`text-sm ${language === lang.code ? "text-accent font-medium" : "text-muted"}`}>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🔐</span>
                      <div>
                        <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                        <p className="text-xs text-accent-green">Enabled</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-card-border text-muted text-sm rounded-lg hover:border-accent hover:text-white transition-colors">
                      Configure
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🔑</span>
                      <div>
                        <p className="text-sm font-medium text-white">Password</p>
                        <p className="text-xs text-muted">Last changed 30 days ago</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-card-border text-muted text-sm rounded-lg hover:border-accent hover:text-white transition-colors">
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📱</span>
                      <div>
                        <p className="text-sm font-medium text-white">Active Sessions</p>
                        <p className="text-xs text-muted">3 devices logged in</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-accent-red/30 text-accent-red text-sm rounded-lg hover:bg-accent-red/10 transition-colors">
                      Revoke All
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-accent-red/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-accent-red mb-2">Danger Zone</h3>
                <p className="text-sm text-muted mb-4">Irreversible actions. Please proceed with caution.</p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-accent-red/30 text-accent-red text-sm font-medium rounded-lg hover:bg-accent-red/10 transition-colors">
                    Delete Account
                  </button>
                  <button className="px-4 py-2 border border-accent-orange/30 text-accent-orange text-sm font-medium rounded-lg hover:bg-accent-orange/10 transition-colors">
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={handleSave}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                saved
                  ? "bg-accent-green text-white shadow-lg shadow-accent-green/30"
                  : "bg-accent text-white hover:bg-accent/80 hover:shadow-lg hover:shadow-accent/20"
              }`}
            >
              {saved ? "✓ Saved!" : "Save Changes"}
            </button>
            <button className="px-6 py-2.5 rounded-lg text-sm font-medium text-muted border border-card-border hover:text-white hover:border-accent/30 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
