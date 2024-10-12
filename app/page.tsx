import Approach from '@/components/Approach';
import Clients from '@/components/Client';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Grid from '@/components/Grid';
import Hero from '@/components/Hero';
import RecentProjects from '@/components/RecentProjects';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { navItems } from '@/data';

export default function Home() {
  return (
    <main >
      <div className='relative
        bg-black-100
        flex
        justify-center
        items-center
        flex-col
        mx-auto
        sm:px-10
        px-5
        overflow-clip'
      >
        <div className="max-w-7x1 w-full">
          <FloatingNav navItems={navItems} />
          <Hero />
          <Grid />
          <RecentProjects />
          <Clients />
          <Experience />
          <Approach />
          <Footer />
        </div>
      </div>
    </main>
  );
}
