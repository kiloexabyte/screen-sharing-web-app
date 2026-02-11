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


	err := sh.Exec(ctx, "pnpm", "install")
	if err != nil {
		log.Fatal(err)
	}

	err = sh.Exec(ctx, "pnpm", "run", "build")
	if err != nil {
		log.Fatal(err)
	}
}
