import React, { useState, useMemo } from 'react';
import { useCompanyProfiles } from '@/hooks/useCompanyProfiles';
import { CompanyProfile, ApplicationStatus } from '@/types/database';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Building2,
  CheckSquare,
  Square,
  Plus,
  Search,
  AlertCircle,
  Code2,
  UserCheck,
  Calculator,
  Save,
  Trash2,
  ChevronDown,
  ChevronUp,
  Layers,
} from 'lucide-react';

const statusLabels: Record<ApplicationStatus, { label: string; variant: 'default' | 'secondary' | 'solved' | 'attempted' | 'urgent' | 'revise' | 'outline' }> = {
  wishlist: { label: 'Wishlist', variant: 'outline' },
  applied: { label: 'Applied', variant: 'attempted' },
  oa_cleared: { label: 'OA Cleared', variant: 'revise' },
  interviewing: { label: 'Interviewing', variant: 'secondary' },
  offered: { label: 'Offer Received', variant: 'solved' },
  rejected: { label: 'Archived / Rejected', variant: 'urgent' },
};

export const CompaniesPage: React.FC = () => {
  const {
    profiles,
    saveProfile,
    updateStatus,
    toggleChecklist,
    deleteProfile,
    createProfile,
  } = useCompanyProfiles();

  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // Local state for editing personal notes
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});
  const [notesSaved, setNotesSaved] = useState<Record<string, boolean>>({});

  // Add Company Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Software Engineer (Fresher)');
  const [newEligibility, setNewEligibility] = useState('60% or 6.5 CGPA in B.Tech, no active backlogs');
  const [newPattern, setNewPattern] = useState('Aptitude + Technical MCQs + Coding + Tech & HR Interview');
  const [newAptitude, setNewAptitude] = useState('');
  const [newCoding, setNewCoding] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newHr, setNewHr] = useState('');

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered companies
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchRole = p.role.toLowerCase().includes(q);
        const matchNotes = p.notes.toLowerCase().includes(q);
        if (!matchName && !matchRole && !matchNotes) return false;
      }
      return true;
    });
  }, [profiles, statusFilter, searchQuery]);

  // Status metrics
  const stats = useMemo(() => {
    let applied = 0;
    let oaCleared = 0;
    let interviewing = 0;
    let offered = 0;

    profiles.forEach((p) => {
      if (p.status === 'applied') applied++;
      if (p.status === 'oa_cleared') oaCleared++;
      if (p.status === 'interviewing') interviewing++;
      if (p.status === 'offered') offered++;
    });

    return { total: profiles.length, applied, oaCleared, interviewing, offered };
  }, [profiles]);

  const handleSaveNotes = async (company: CompanyProfile) => {
    const text = editingNotes[company.id] !== undefined ? editingNotes[company.id] : company.notes;
    await saveProfile({
      ...company,
      notes: text,
      updatedAt: new Date().toISOString(),
    });
    setNotesSaved((prev) => ({ ...prev, [company.id]: true }));
    setTimeout(() => {
      setNotesSaved((prev) => ({ ...prev, [company.id]: false }));
    }, 2500);
  };

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    await createProfile(
      newName,
      newRole,
      newEligibility,
      newPattern,
      newAptitude,
      newCoding,
      newTech,
      newHr
    );

    // Reset form
    setNewName('');
    setNewRole('Software Engineer (Fresher)');
    setNewEligibility('60% or 6.5 CGPA in B.Tech, no active backlogs');
    setNewPattern('Aptitude + Technical MCQs + Coding + Tech & HR Interview');
    setNewAptitude('');
    setNewCoding('');
    setNewTech('');
    setNewHr('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module K</span>
          <Badge variant="outline">Campus Placement Pipeline</Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Company Preparation & Pipeline</h1>
            <p className="text-xs text-zinc-400 max-w-2xl mt-1">
              Track hiring drives, check eligibility cutoffs, review round patterns, prepare company-specific technical topics, and maintain interview checklists.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Target Company
          </Button>
        </div>
      </div>

      {/* Official Guidelines Disclaimer */}
      <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-start gap-3 text-xs text-zinc-400 leading-relaxed">
        <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-zinc-200 font-semibold">Important Recruitment Notice: </strong>
          Hiring patterns, eligibility cutoffs, and package tiers are general guidance based on past college drives. Always verify current criteria and branch restrictions against the official recruitment notification on your campus placement cell portal.
        </div>
      </div>

      {/* Pipeline Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
          <span className="text-xs text-zinc-400">Total Tracked</span>
          <div className="text-xl font-bold text-white mt-0.5">{stats.total}</div>
        </div>
        <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
          <span className="text-xs text-amber-400">Applied</span>
          <div className="text-xl font-bold text-amber-300 mt-0.5">{stats.applied}</div>
        </div>
        <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
          <span className="text-xs text-purple-400">OA Cleared</span>
          <div className="text-xl font-bold text-purple-300 mt-0.5">{stats.oaCleared}</div>
        </div>
        <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
          <span className="text-xs text-blue-400">Interviewing</span>
          <div className="text-xl font-bold text-blue-300 mt-0.5">{stats.interviewing}</div>
        </div>
        <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
          <span className="text-xs text-emerald-400">Offers</span>
          <div className="text-xl font-bold text-emerald-300 mt-0.5">{stats.offered}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded-full transition shrink-0 ${
              statusFilter === 'all'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            All ({profiles.length})
          </button>
          {(['wishlist', 'applied', 'oa_cleared', 'interviewing', 'offered', 'rejected'] as const).map(
            (st) => {
              const count = profiles.filter((p) => p.status === st).length;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition shrink-0 ${
                    statusFilter === st
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {statusLabels[st].label} ({count})
                </button>
              );
            }
          )}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search company or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
          />
        </div>
      </div>

      {/* Companies List */}
      <div className="space-y-4">
        {filteredProfiles.length === 0 ? (
          <div className="py-12 text-center text-xs text-zinc-500 bg-zinc-900/20 rounded-lg border border-zinc-800/80">
            No company profiles match the selected filter.
          </div>
        ) : (
          filteredProfiles.map((company) => {
            const isExpanded = expandedCards[company.id] ?? false;
            const currentNote =
              editingNotes[company.id] !== undefined ? editingNotes[company.id] : company.notes;
            const isSaved = notesSaved[company.id];

            // Checklist completion
            const totalTasks = company.checklist.length;
            const completedTasks = company.checklist.filter((c) => c.completed).length;

            return (
              <Card
                key={company.id}
                className="bg-zinc-900/40 border-zinc-800 hover:border-zinc-750 transition"
              >
                <CardHeader className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 mt-0.5">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-white">{company.name}</h3>
                          <Badge variant={statusLabels[company.status].variant}>
                            {statusLabels[company.status].label}
                          </Badge>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{company.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Status Dropdown */}
                      <select
                        value={company.status}
                        onChange={(e) => updateStatus(company.id, e.target.value as ApplicationStatus)}
                        className="bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                      >
                        <option value="wishlist">Wishlist</option>
                        <option value="applied">Applied</option>
                        <option value="oa_cleared">OA Cleared</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offered">Offer Received</option>
                        <option value="rejected">Archived / Rejected</option>
                      </select>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(company.id)}
                        className="text-zinc-400 hover:text-white"
                      >
                        {isExpanded ? (
                          <span className="flex items-center gap-1 text-xs">
                            Less <ChevronUp className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs">
                            Details <ChevronDown className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-zinc-800/80 text-xs">
                    <div>
                      <span className="text-zinc-500 font-medium">Eligibility: </span>
                      <span className="text-zinc-300">{company.eligibility}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-medium">Assessment Pattern: </span>
                      <span className="text-zinc-300">{company.assessmentPattern}</span>
                    </div>
                  </div>
                </CardHeader>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <CardContent className="px-4 sm:px-5 pb-5 pt-0 space-y-4 border-t border-zinc-800/80 mt-1">
                    {/* 4 Preparation Pillars */}
                    <div className="grid sm:grid-cols-2 gap-3 pt-3">
                      {company.aptitudePrep && (
                        <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs space-y-1">
                          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                            <Calculator className="h-3.5 w-3.5" />
                            <span>Aptitude Preparation Focus:</span>
                          </span>
                          <p className="text-zinc-300 leading-relaxed text-[11px]">{company.aptitudePrep}</p>
                        </div>
                      )}

                      {company.codingPrep && (
                        <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs space-y-1">
                          <span className="font-semibold text-blue-400 flex items-center gap-1.5">
                            <Code2 className="h-3.5 w-3.5" />
                            <span>Coding / DSA Focus:</span>
                          </span>
                          <p className="text-zinc-300 leading-relaxed text-[11px]">{company.codingPrep}</p>
                        </div>
                      )}

                      {company.techInterviewTopics && (
                        <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs space-y-1">
                          <span className="font-semibold text-purple-400 flex items-center gap-1.5">
                            <Layers className="h-3.5 w-3.5" />
                            <span>Technical Interview Core:</span>
                          </span>
                          <p className="text-zinc-300 leading-relaxed text-[11px]">{company.techInterviewTopics}</p>
                        </div>
                      )}

                      {company.hrInterviewTopics && (
                        <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs space-y-1">
                          <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                            <UserCheck className="h-3.5 w-3.5" />
                            <span>HR & Managerial Focus:</span>
                          </span>
                          <p className="text-zinc-300 leading-relaxed text-[11px]">{company.hrInterviewTopics}</p>
                        </div>
                      )}
                    </div>

                    {/* Preparation & Round Checklist */}
                    <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-300">
                          Preparation Checklist ({completedTasks}/{totalTasks} Completed)
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-2">
                        {company.checklist.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => toggleChecklist(company.id, item.id)}
                            className={`p-2.5 rounded-lg border text-xs text-left transition flex items-start gap-2 ${
                              item.completed
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                            }`}
                          >
                            {item.completed ? (
                              <CheckSquare className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Square className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" />
                            )}
                            <span className={item.completed ? 'line-through text-zinc-400' : 'text-zinc-300'}>
                              {item.task}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Personal Notes Textarea */}
                    <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-zinc-300">
                          Personal Notes & Referral Tracking:
                        </label>
                        {isSaved && (
                          <span className="text-xs text-emerald-400 font-semibold">
                            Saved to IndexedDB!
                          </span>
                        )}
                      </div>

                      <textarea
                        rows={2}
                        value={currentNote}
                        onChange={(e) =>
                          setEditingNotes((prev) => ({ ...prev, [company.id]: e.target.value }))
                        }
                        placeholder="Log application ID, test date, alumni contacts, or specific tips..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500 resize-none"
                      />

                      <div className="flex items-center justify-between pt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteProfile(company.id)}
                          className="text-xs text-zinc-500 hover:text-rose-400 flex items-center gap-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete Profile
                        </Button>

                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleSaveNotes(company)}
                          className="text-xs flex items-center gap-1.5"
                        >
                          <Save className="h-3.5 w-3.5" />
                          Save Notes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })
        )}
      </div>

      {/* ADD TARGET COMPANY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <Card className="max-w-lg w-full bg-zinc-900 border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleCreateCompany}>
              <CardHeader>
                <CardTitle className="text-base text-white">Add Custom Target Company</CardTitle>
                <CardDescription className="text-xs">
                  Create a custom preparation profile for on-campus or off-campus recruitment drives.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium">Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cisco, Oracle, Dell"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium">Target Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Associate Software Engineer"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium">Eligibility Guidelines</label>
                  <input
                    type="text"
                    value={newEligibility}
                    onChange={(e) => setNewEligibility(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium">Assessment Pattern</label>
                  <input
                    type="text"
                    value={newPattern}
                    onChange={(e) => setNewPattern(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium">Aptitude Prep Focus</label>
                  <input
                    type="text"
                    placeholder="e.g. Speed math, series, syllogisms"
                    value={newAptitude}
                    onChange={(e) => setNewAptitude(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium">Coding / DSA Focus</label>
                  <input
                    type="text"
                    placeholder="e.g. Two-pointer, Strings, Dynamic Programming"
                    value={newCoding}
                    onChange={(e) => setNewCoding(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium">Technical Interview Focus</label>
                  <input
                    type="text"
                    placeholder="e.g. OOP, DBMS normalisation, OS paging, SQL joins"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                  <Button variant="outline" size="sm" type="button" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    Create Profile
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
