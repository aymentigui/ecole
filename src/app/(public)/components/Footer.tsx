import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image src="/logo.png" alt="Logo" width={60} height={60} />
            <p className="mt-2">Notre école de formation s'engage à fournir une éducation de qualité depuis plus de 20 ans.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Accueil</Link></li>
              <li><Link href="/a-propos" className="hover:underline">À propos</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              <li><Link href="/collaborations" className="hover:underline">Collaboration</Link></li>
              <li><Link href="/formations" className="hover:underline">Formations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p>Téléphone: +33 1 23 45 67 89</p>
            <p>Email: contact@ecole-formation.fr</p>
            <p>Adresse: 123 Rue de la Formation, 75000 Paris</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

