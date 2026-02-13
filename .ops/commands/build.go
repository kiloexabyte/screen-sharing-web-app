package commands

import (
	"context"
	"log"

	"lesiw.io/command"
	"lesiw.io/command/sys"
)

func (Ops) Build() {
	ctx := context.Background()
	sh := command.Shell(sys.Machine(), "pnpm")

	if err := sh.Exec(ctx, "pnpm", "install"); err != nil {
		log.Fatal(err)
	}

	if err := sh.Exec(ctx, "pnpm", "run", "build"); err != nil {
		log.Fatal(err)
	}
}
