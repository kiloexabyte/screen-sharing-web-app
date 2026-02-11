package commands

import (
	"context"
	"log"

	"lesiw.io/command"
	"lesiw.io/command/sys"
)

func (o Ops) Test() {
	ctx := context.Background()
	sh := command.Shell(sys.Machine(), "npx", "pnpm")

	if err := o.cache.Restore(pnpmCacheKey(), pnpmCachePaths); err != nil {
		log.Printf("cache restore: %v", err)
	}

	err := sh.Exec(ctx, "pnpm", "install")
	if err != nil {
		log.Fatal(err)
	}

	if err := o.cache.Save(pnpmCacheKey(), pnpmCachePaths); err != nil {
		log.Printf("cache save: %v", err)
	}

	err = sh.Exec(ctx, "npx", "vitest", "run", "tests/units")
	if err != nil {
		log.Fatal(err)
	}

	err = sh.Exec(ctx, "npx", "vitest", "run", "tests/integrations")
	if err != nil {
		log.Fatal(err)
	}
}
