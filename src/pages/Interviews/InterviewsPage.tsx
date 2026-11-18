import React, { useState } from 'react';
import { useInterviewPrep } from '@/hooks/useInterviewPrep';
import type { TechnicalInterviewQuestion } from '@/types/interview';
import { technicalInterviewSubjects, hrInterviewQuestions } from '@/content/interviews';
import { projectDefenseFrameworkSteps } from '@/content/interviews/projectInterview';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  UserCheck,
  Search,
  Code2,
  ChevronDown,
  ChevronUp,
  Save,
  HelpCircle,
  Lightbulb,
  AlertCircle,
  ShieldCheck,
  Layers,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

export const InterviewsPage: React.FC = () => {
  const {
    selectedSubject,
    setSelectedSubject,
    searchQuery,
    setSearchQuery,
    hrNotes,
    saveHrNote,
    projectData,
    saveProjectData,
    technicalInterviewQuestions,
  } = useInterviewPrep();

  const [activeTab, setActiveTab] = useState<'technical' | 'hr' | 'project'>('technical');

  // Expanded technical question cards
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  // Local draft inputs for HR notes before clicking save
  const [draftHrNotes, setDraftHrNotes] = useState<Record<string, string>>({});
  const [savedFeedback, setSavedFeedback] = useState<Record<string, boolean>>({});

  // Local project blueprint state
  const [editingProject, setEditingProject] = useState(false);
  const [blueprint, setBlueprint] = useState(projectData);
  const [blueprintSavedMsg, setBlueprintSavedMsg] = useState(false);

  // Sync blueprint if projectData loads
  React.useEffect(() => {
    setBlueprint(projectData);
  }, [projectData]);

  const toggleQuestionExpanded = (id: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSaveHr = async (qId: string) => {
    const text = draftHrNotes[qId] !== undefined ? draftHrNotes[qId] : hrNotes[qId] || '';
    await saveHrNote(qId, text);
    setSavedFeedback((prev) => ({ ...prev, [qId]: true }));
    setTimeout(() => {
      setSavedFeedback((prev) => ({ ...prev, [qId]: false }));
    }, 2500);
  };

  const handleSaveProjectBlueprint = async () => {
    await saveProjectData(blueprint);
    setBlueprintSavedMsg(true);
    setEditingProject(false);
    setTimeout(() => setBlueprintSavedMsg(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module J</span>
          <Badge variant="outline">Interview Preparation Centre</Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Interview Preparation Hub</h1>
            <p className="text-xs text-zinc-400 max-w-2xl mt-1">
              Curated technical interview Q&A across 8 core subjects, 10 high-impact HR round frameworks with editable personal answers, and an architectural project defense blueprint.
            </p>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab('technical')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'technical'
              ? 'bg-blue-600 text-white'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <Code2 className="h-3.5 w-3.5" />
          <span>Technical Interview Q&A (90+)</span>
        </button>

        <button
          onClick={() => setActiveTab('hr')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'hr'
              ? 'bg-blue-600 text-white'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <UserCheck className="h-3.5 w-3.5" />
          <span>HR & Behavioral Framework (10)</span>
        </button>

        <button
          onClick={() => setActiveTab('project')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'project'
              ? 'bg-blue-600 text-white'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Project Defense Blueprint</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TECHNICAL INTERVIEW Q&A */}
      {/* ========================================================================= */}
      {activeTab === 'technical' && (
        <div className="space-y-6">
          {/* Subject Pills & Search Filter */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-3 py-1 text-xs font-medium rounded-full transition shrink-0 ${
                  selectedSubject === 'all'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                All Subjects
              </button>
              {technicalInterviewSubjects.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition shrink-0 ${
                    selectedSubject === sub.id
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>

            <div className="relative min-w-[220px]">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search technical questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
              />
            </div>
          </div>

          {/* Question Count Header */}
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Showing {technicalInterviewQuestions.length} interview questions</span>
            <span className="italic">Click any question card to inspect code snippets and interviewer follow-ups</span>
          </div>

          {/* Question Cards List */}
          <div className="space-y-3">
            {technicalInterviewQuestions.map((q: TechnicalInterviewQuestion) => {
              const isExpanded = expandedQuestions[q.id] ?? false;

              return (
                <Card
                  key={q.id}
                  className={`bg-zinc-900/40 border transition ${
                    isExpanded ? 'border-zinc-700 shadow-md' : 'border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <CardHeader
                    className="p-4 cursor-pointer select-none"
                    onClick={() => toggleQuestionExpanded(q.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="capitalize text-[10px]">
                            {q.subject}
                          </Badge>
                          <Badge
                            variant={
                              q.difficulty === 'Easy'
                                ? 'solved'
                                : q.difficulty === 'Medium'
                                ? 'attempted'
                                : 'urgent'
                            }
                            className="capitalize text-[10px]"
                          >
                            {q.difficulty}
                          </Badge>
                          {q.codeSnippet && (
                            <Badge variant="secondary" className="text-[10px] text-blue-400">
                              Code Included
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-sm font-semibold text-zinc-100 leading-snug">
                          {q.question}
                        </h3>

                        {/* Concise Answer (Always visible for rapid revision) */}
                        <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                          <strong className="text-zinc-300 font-medium">Quick Answer: </strong>
                          {q.answer}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </CardHeader>

                  {/* Expanded Detailed Section */}
                  {isExpanded && (
                    <CardContent className="px-4 pb-4 pt-1 space-y-4 border-t border-zinc-800/80 mt-2">
                      {/* Deep-dive Explanation */}
                      {q.explanation && (
                        <div className="space-y-1.5 text-xs text-zinc-300">
                          <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5 text-blue-400" />
                            <span>Detailed Technical Explanation:</span>
                          </span>
                          <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 leading-relaxed whitespace-pre-wrap">
                            {q.explanation}
                          </div>
                        </div>
                      )}

                      {/* Code Snippet (if available) */}
                      {q.codeSnippet && (
                        <div className="space-y-1.5 text-xs">
                          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                            <Code2 className="h-3.5 w-3.5" />
                            <span>Code Snippet / Implementation:</span>
                          </span>
                          <pre className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-200 overflow-x-auto leading-relaxed">
                            {q.codeSnippet}
                          </pre>
                        </div>
                      )}

                      {/* Potential Follow-up Questions */}
                      {q.followUpQuestions && q.followUpQuestions.length > 0 && (
                        <div className="space-y-1.5 text-xs">
                          <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                            <HelpCircle className="h-3.5 w-3.5" />
                            <span>Interviewer Follow-up Inquiries:</span>
                          </span>
                          <ul className="list-disc list-inside text-zinc-400 space-y-1 p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                            {q.followUpQuestions.map((fu: string, idx: number) => (
                              <li key={idx} className="leading-relaxed">
                                {fu}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: HR & BEHAVIORAL INTERVIEW */}
      {/* ========================================================================= */}
      {activeTab === 'hr' && (
        <div className="space-y-6">
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-sm font-semibold text-zinc-200">10 Core Placement HR Questions</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Master recruiter psychology, recommended structure, and draft your authentic personal responses stored safely in IndexedDB.
            </p>
          </div>

          <div className="space-y-6">
            {hrInterviewQuestions.map((hr, idx) => {
              const currentDraft =
                draftHrNotes[hr.id] !== undefined ? draftHrNotes[hr.id] : hrNotes[hr.id] || '';
              const isSavedJustNow = savedFeedback[hr.id];

              return (
                <Card key={hr.id} className="bg-zinc-900/40 border-zinc-800">
                  <CardHeader className="pb-3 border-b border-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-400">Question #{idx + 1}</span>
                      <Badge variant="outline" className="text-[10px]">
                        Campus Placement Round
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-bold text-white mt-1">
                      {hr.question}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-4 space-y-4">
                    {/* Recruiter Objective */}
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs">
                      <span className="font-semibold text-blue-300 block mb-0.5">Recruiter's True Objective:</span>
                      <p className="text-blue-200 leading-relaxed">{hr.objective}</p>
                    </div>

                    {/* Answering Structure */}
                    <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs space-y-1">
                      <span className="font-semibold text-zinc-300 block">Recommended 3-Part Structure:</span>
                      <p className="text-zinc-400 leading-relaxed font-mono text-[11px]">{hr.answerStructure.join(' → ')}</p>
                    </div>

                    {/* Realistic Sample Answer */}
                    <div className="space-y-1 text-xs">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Realistic Fresher Sample Answer:</span>
                      </span>
                      <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 leading-relaxed whitespace-pre-wrap">
                        {hr.sampleAnswer}
                      </div>
                    </div>

                    {/* Mistakes to Avoid & Pro Tips */}
                    <div className="grid sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300">
                        <span className="font-semibold flex items-center gap-1 text-rose-400 mb-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>Mistakes to Avoid:</span>
                        </span>
                        <p className="leading-relaxed text-rose-200 text-[11px]">{hr.mistakesToAvoid.join('; ')}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
                        <span className="font-semibold flex items-center gap-1 text-amber-400 mb-1">
                          <Lightbulb className="h-3.5 w-3.5" />
                          <span>Mentor Pro Tip:</span>
                        </span>
                        <p className="leading-relaxed text-amber-200 text-[11px]">{hr.proTips.join('; ')}</p>
                      </div>
                    </div>

                    {/* Personal Answer / Notes Textarea */}
                    <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                          <UserCheck className="h-3.5 w-3.5 text-blue-400" />
                          <span>Your Authentic Answer Draft:</span>
                        </label>
                        {isSavedJustNow && (
                          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Saved to IndexedDB
                          </span>
                        )}
                      </div>

                      <textarea
                        rows={3}
                        value={currentDraft}
                        onChange={(e) =>
                          setDraftHrNotes((prev) => ({ ...prev, [hr.id]: e.target.value }))
                        }
                        placeholder="Draft your personal college story, technical strengths, or projects in your own words..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 leading-relaxed resize-none"
                      />

                      <div className="flex justify-end">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleSaveHr(hr.id)}
                          className="flex items-center gap-1.5 text-xs text-zinc-300"
                        >
                          <Save className="h-3.5 w-3.5" />
                          Save My Answer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PROJECT DEFENSE BLUEPRINT */}
      {/* ========================================================================= */}
      {activeTab === 'project' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-800 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-zinc-200">Major Project Defense Blueprint</h2>
              <p className="text-xs text-zinc-400 mt-1">
                How to confidently explain your technical projects to senior interviewers. Loaded with AK67 reference architecture or editable for your own college capstone project.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {blueprintSavedMsg && (
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Blueprint Saved!
                </span>
              )}
              <Button
                variant={editingProject ? 'primary' : 'outline'}
                size="sm"
                onClick={() => {
                  if (editingProject) {
                    handleSaveProjectBlueprint();
                  } else {
                    setEditingProject(true);
                  }
                }}
              >
                {editingProject ? 'Save Changes' : 'Customize For My Project'}
              </Button>
            </div>
          </div>

          {/* 5-Step Defense Guide */}
          <div className="grid gap-3 sm:grid-cols-5">
            {projectDefenseFrameworkSteps.map((s, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs space-y-1">
                <span className="font-bold text-blue-400 block">{s.step}</span>
                <p className="text-zinc-400 text-[11px] leading-relaxed">{s.guidance}</p>
              </div>
            ))}
          </div>

          {/* Blueprint Details Card */}
          <Card className="bg-zinc-900/40 border-zinc-800">
            <CardHeader className="pb-3 border-b border-zinc-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-zinc-100 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Technical Project Profile</span>
                </CardTitle>
                <Badge variant="outline">Saved in IndexedDB</Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-5">
              {/* Project Title */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Project Title:
                </label>
                {editingProject ? (
                  <input
                    type="text"
                    value={blueprint.title}
                    onChange={(e) => setBlueprint((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200"
                  />
                ) : (
                  <div className="text-sm font-bold text-white">{blueprint.title}</div>
                )}
              </div>

              {/* Problem Statement */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  1. The Real-World Problem Solved:
                </label>
                {editingProject ? (
                  <textarea
                    rows={3}
                    value={blueprint.problemStatement}
                    onChange={(e) =>
                      setBlueprint((prev) => ({ ...prev, problemStatement: e.target.value }))
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 resize-none"
                  />
                ) : (
                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                    {blueprint.problemStatement}
                  </p>
                )}
              </div>

              {/* System Architecture */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  2. System Architecture & Component Design:
                </label>
                {editingProject ? (
                  <textarea
                    rows={3}
                    value={blueprint.architecture}
                    onChange={(e) =>
                      setBlueprint((prev) => ({ ...prev, architecture: e.target.value }))
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 resize-none"
                  />
                ) : (
                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                    {blueprint.architecture}
                  </p>
                )}
              </div>

              {/* Tech Stack Rationale */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  3. Technology Stack Justification:
                </label>
                {editingProject ? (
                  <textarea
                    rows={3}
                    value={blueprint.techStack}
                    onChange={(e) =>
                      setBlueprint((prev) => ({ ...prev, techStack: e.target.value }))
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 resize-none"
                  />
                ) : (
                  <pre className="text-xs font-mono text-zinc-300 leading-relaxed bg-zinc-950 p-3 rounded-lg border border-zinc-800 whitespace-pre-wrap">
                    {blueprint.techStack}
                  </pre>
                )}
              </div>

              {/* Database & Data Storage Design */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  4. Database & Storage Architecture:
                </label>
                {editingProject ? (
                  <textarea
                    rows={3}
                    value={blueprint.databaseDesign}
                    onChange={(e) =>
                      setBlueprint((prev) => ({ ...prev, databaseDesign: e.target.value }))
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 resize-none"
                  />
                ) : (
                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                    {blueprint.databaseDesign}
                  </p>
                )}
              </div>

              {/* Key Decisions & Trade-offs */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  5. Key Engineering Decisions & Trade-offs:
                </label>
                {editingProject ? (
                  <textarea
                    rows={3}
                    value={blueprint.implementationDecisions}
                    onChange={(e) =>
                      setBlueprint((prev) => ({ ...prev, implementationDecisions: e.target.value }))
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 resize-none"
                  />
                ) : (
                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-3 rounded-lg border border-zinc-800 whitespace-pre-wrap">
                    {blueprint.implementationDecisions}
                  </p>
                )}
              </div>

              {/* Toughest Challenge Solved */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  6. Hardest Technical Bug / Challenge Solved:
                </label>
                {editingProject ? (
                  <textarea
                    rows={3}
                    value={blueprint.challengesFaced}
                    onChange={(e) =>
                      setBlueprint((prev) => ({ ...prev, challengesFaced: e.target.value }))
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 resize-none"
                  />
                ) : (
                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                    {blueprint.challengesFaced}
                  </p>
                )}
              </div>

              {/* Security & Scalability */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Security Considerations:
                  </label>
                  {editingProject ? (
                    <textarea
                      rows={2}
                      value={blueprint.securityConsiderations}
                      onChange={(e) =>
                        setBlueprint((prev) => ({ ...prev, securityConsiderations: e.target.value }))
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 resize-none"
                    />
                  ) : (
                    <p className="text-xs text-zinc-400 bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                      {blueprint.securityConsiderations}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Future Roadmap:
                  </label>
                  {editingProject ? (
                    <textarea
                      rows={2}
                      value={blueprint.futureImprovements}
                      onChange={(e) =>
                        setBlueprint((prev) => ({ ...prev, futureImprovements: e.target.value }))
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 resize-none"
                    />
                  ) : (
                    <p className="text-xs text-zinc-400 bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                      {blueprint.futureImprovements}
                    </p>
                  )}
                </div>
              </div>

              {/* 10 Frequent Project Questions */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>10 Frequent Interviewer Project Questions to Prepare:</span>
                </span>
                <div className="grid sm:grid-cols-2 gap-2">
                  {blueprint.interviewerQuestions.map((qText, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-md bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2"
                    >
                      <span className="font-bold text-blue-400">{idx + 1}.</span>
                      <span className="leading-relaxed">{qText}</span>
                    </div>
                  ))}
                </div>
              </div>

              {editingProject && (
                <div className="flex justify-end pt-3">
                  <Button variant="primary" size="sm" onClick={handleSaveProjectBlueprint}>
                    <Save className="h-3.5 w-3.5" />
                    Save Project Blueprint
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
