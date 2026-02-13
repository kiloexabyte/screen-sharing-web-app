package commands

import (
	"context"
	"log"

	"lesiw.io/command"
	"lesiw.io/command/sys"
)

func (Ops) Test() {
	ctx := context.Background()
	sh := command.Shell(sys.Machine(), "bunx", "bun")

	if err := sh.Exec(ctx, "bun", "install"); err != nil {
		log.Fatal(err)
	}

	if err := sh.Exec(ctx, "bunx", "vitest", "run", "tests/units"); err != nil {
		log.Fatal(err)
	}

	if err := sh.Exec(ctx, "bunx", "vitest", "run", "tests/integrations"); err != nil {
		log.Fatal(err)
	}
}
