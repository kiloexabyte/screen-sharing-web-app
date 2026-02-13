package commands

import (
	"context"
	"log"

	"lesiw.io/command"
	"lesiw.io/command/sys"
)

func (Ops) Build() {
	ctx := context.Background()
	sh := command.Shell(sys.Machine(), "bun")

	if err := sh.Exec(ctx, "bun", "install"); err != nil {
		log.Fatal(err)
	}

	if err := sh.Exec(ctx, "bun", "run", "build"); err != nil {
		log.Fatal(err)
	}
}
