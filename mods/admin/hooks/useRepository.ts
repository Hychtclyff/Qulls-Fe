import { useQuery } from '@tanstack/react-query';
import { repositoryApi } from '../services/repository.service';
import { useState, useMemo } from 'react';

export const useRepo = () => {
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('ALL');

  const orgsQuery = useQuery({
    queryKey: ['github-orgs'],
    queryFn: repositoryApi.getListOrg,
    refetchOnWindowFocus:false
  });

  const personalRepoQuery = useQuery({
    queryKey: ['github-repo-personal'],
    queryFn: () => repositoryApi.getPersonaRepo(),
    refetchOnWindowFocus:false
  });

  const orgRepoQuery = useQuery({
    queryKey: ['github-repo-org', selectedOrg],
    queryFn: () => repositoryApi.getOrgRepo(selectedOrg!),
    enabled: !!selectedOrg,
    refetchOnWindowFocus: false,
  });

  const filteredRepos = useMemo(() => {
    return (
      (selectedOrg
        ? orgRepoQuery.data?.repositories
        : personalRepoQuery.data?.repositories
      )?.filter((repo) => {
        const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLang = selectedLang === 'ALL' || repo.primaryLanguage === selectedLang;
        return matchesSearch && matchesLang;
      }) || []
    );
  }, [selectedOrg, orgRepoQuery.data, personalRepoQuery.data, searchQuery, selectedLang]);

  const categories = useMemo(() => {
    const repos =
      (selectedOrg ? orgRepoQuery.data?.repositories : personalRepoQuery.data?.repositories) || [];
    const langs = repos.map((r) => r.primaryLanguage).filter(Boolean);
    return ['ALL', ...Array.from(new Set(langs))];
  }, [selectedOrg, orgRepoQuery.data, personalRepoQuery.data]);

  return {
    orgs: orgsQuery.data || [],
    filteredRepos,
    categories,
    isLoading: orgsQuery.isLoading || personalRepoQuery.isLoading || orgRepoQuery.isFetching,
    searchQuery,
    setSearchQuery,
    selectedLang,
    setSelectedLang,
    selectedOrg,
    setSelectedOrg,
  };
};
