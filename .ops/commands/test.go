package commands

import (
	"context"
	"log"

	"lesiw.io/command"
	"lesiw.io/command/sys"
)

func (Ops) Test() {
	ctx := context.Background()
	sh := command.Shell(sys.Machine(), "npx", "pnpm")

	err := sh.Exec(ctx, "pnpm", "install")
	if err != nil {
		log.Fatal(err)
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
