'use client';

import {
  Wallet
} from 'lucide-react';

export default function HeroHeader({

  user,
  balance

}) {

  return (

    <div className=\"bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center justify-between\">

      <div>

        <h1 className=\"text-5xl font-black\">

          Hi, {user?.full_name}

        </h1>

        <p className=\"text-gray-400 mt-3\">

          Connected WhatsApp

        </p>

      </div>

      <div className=\"text-right\">

        <Wallet className=\"w-10 h-10 text-cyan-400 ml-auto\" />

        <h2 className=\"text-5xl font-black text-cyan-400 mt-3\">

          Rp {balance?.toLocaleString()}

        </h2>

      </div>

    </div>

  );

}
