import LogoStudioGhibli from "@/components/Logo/LogoGhibli";

export const Navbar = () => {
  return (
    <nav className="min-h-[80px] max-h-[80px] w-full flex items-center justify-between px-[150px] py-6 fixed top-0 bg-background backdrop-blur-xl z-30">
      <LogoStudioGhibli  width={200} height={200}/>

      <div className="flex items-center justify-center gap-4">
        <a href="/">Filmes</a>
        <a href="/movies">Sobre</a>
        <a href="/characters">Minha Lista</a>
      </div> 

    </nav>
  );
};
