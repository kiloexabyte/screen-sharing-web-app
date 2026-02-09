package commands

import (
	"context"
	"log"

	"lesiw.io/command"
	"lesiw.io/command/sys"
)

func (Ops) Build() {
	ctx := context.Background()
	sh := command.Shell(sys.Machine(), "npm", "pnpm")

	npm := useNpmOrPnpm(ctx, sh)

	err := sh.Exec(ctx, npm, "install")
	if err != nil {
		log.Fatal(err)
	}

	err = sh.Exec(ctx, npm, "run", "build")
	if err != nil {
		log.Fatal(err)
	}
}
