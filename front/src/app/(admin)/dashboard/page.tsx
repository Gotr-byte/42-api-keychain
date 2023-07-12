'use client';

import React, { FC, useState } from 'react';

import useSWR from 'swr';

import { CardKeys } from '@/components/dashboard/card-keys';
import { Input } from '@/components/ui/input';

import CardKeyProps from '@/types/card-key';
import { Label } from '@/components/ui/label';

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [search, setSearch] = useState<string>('');
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR('http://localhost:5001/keys', fetcher);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (error) {
    console.log(error);
    return <div>failed to load</div>;
  }

  if (!data) return <div>loading...</div>;

  return (
    <div className="pb-6 md:pb-0">
      <div id="header">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="mt-3">
          Welcome to your dashboard where you can manage your keys and overwatch
          their validity
        </p>
      </div>

      <section className="mt-5 flex flex-col gap-3 md:mt-10">
        <Label className="font-bold">Search</Label>
        <Input
          placeholder="Search by name or client id"
          autoFocus
          onChange={handleSearch}
        />

        <CardKeys
          className="mt-5"
          data={
            search
              ? data.filter(
                  (app: CardKeyProps) =>
                    app.name.includes(search) || app.client_id.includes(search)
                )
              : data
          }
        />
      </section>
    </div>
  );
};

export default Page;
