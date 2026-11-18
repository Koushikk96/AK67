import { useState, useEffect, useCallback } from 'react';
import { CompanyProfile, ApplicationStatus } from '@/types/database';
import { companyRepository } from '@/db/repositories/companyRepository';
import { initialCompanyProfiles } from '@/content/companies/initialCompanies';

export const useCompanyProfiles = () => {
  const [profiles, setProfiles] = useState<CompanyProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadProfiles = useCallback(async () => {
    try {
      setLoading(true);
      let list = await companyRepository.getAll();

      // Seed initial companies if the store is empty
      if (list.length === 0) {
        await companyRepository.batchPut(initialCompanyProfiles);
        list = await companyRepository.getAll();
      }

      setProfiles(list);
    } catch (e) {
      console.error('[useCompanyProfiles] Error loading companies:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const saveProfile = useCallback(async (profile: CompanyProfile) => {
    await companyRepository.upsert(profile);
    await loadProfiles();
  }, [loadProfiles]);

  const updateStatus = useCallback(async (id: string, status: ApplicationStatus) => {
    await companyRepository.updateStatus(id, status);
    await loadProfiles();
  }, [loadProfiles]);

  const toggleChecklist = useCallback(async (companyId: string, checklistId: string) => {
    await companyRepository.toggleChecklist(companyId, checklistId);
    await loadProfiles();
  }, [loadProfiles]);

  const deleteProfile = useCallback(async (id: string) => {
    await companyRepository.delete(id);
    await loadProfiles();
  }, [loadProfiles]);

  const createProfile = useCallback(
    async (
      name: string,
      role: string,
      eligibility?: string,
      assessmentPattern?: string,
      aptitudePrep?: string,
      codingPrep?: string,
      techInterviewTopics?: string,
      hrInterviewTopics?: string
    ) => {
      const slug = 'company-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const newProfile: CompanyProfile = {
        id: slug + '-' + Date.now().toString(36),
        name: name.trim(),
        role: role.trim() || 'Software Engineer (Fresher)',
        eligibility: eligibility || 'Check official company careers portal for specific requirements.',
        assessmentPattern: assessmentPattern || 'Online Assessment + Technical Interview + HR Interview',
        aptitudePrep: aptitudePrep || '',
        codingPrep: codingPrep || '',
        techInterviewTopics: techInterviewTopics || '',
        hrInterviewTopics: hrInterviewTopics || '',
        status: 'wishlist',
        rounds: [
          { id: 'r1', name: 'Online Assessment (OA)', status: 'pending' },
          { id: 'r2', name: 'Technical Interview', status: 'pending' },
          { id: 'r3', name: 'HR / Behavioral Interview', status: 'pending' },
        ],
        checklist: [
          { id: 'c1', task: 'Review online assessment pattern', completed: false },
          { id: 'c2', task: 'Practice core company technical questions', completed: false },
          { id: 'c3', task: 'Prepare project defense and role fitment', completed: false },
        ],
        notes: '',
        updatedAt: new Date().toISOString(),
      };

      await companyRepository.upsert(newProfile);
      await loadProfiles();
      return newProfile;
    },
    [loadProfiles]
  );

  return {
    profiles,
    loading,
    saveProfile,
    updateStatus,
    toggleChecklist,
    deleteProfile,
    createProfile,
    refreshProfiles: loadProfiles,
  };
};
