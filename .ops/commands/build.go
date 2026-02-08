package commands

import (
	"context"
	"log"

	"lesiw.io/command"
	"lesiw.io/command/sys"
)

func (Ops) Build() {
	ctx := context.Background()
	sh := command.Shell(sys.Machine(), "echo", "npm", "pnpm")

	npm := useNpmOrPnpm(ctx, sh)

	err := sh.Exec(ctx, "echo", "hello from cmdbuf")
	if err != nil {
		log.Fatal(err)
	}

	err = sh.Exec(ctx, npm, "install")
	if err != nil {
		log.Fatal(err)
	}

	err = sh.Exec(ctx, npm, "run", "prettyCheck")
	if err != nil {
		log.Fatal(err)
	}

	err = sh.Exec(ctx, npm, "run", "unit-test")
	if err != nil {
		log.Fatal(err)
	}

	err = sh.Exec(ctx, npm, "run", "build")
	if err != nil {
		log.Fatal(err)
	}

	err = sh.Exec(ctx, "echo", "goodbye from cmdbuf")
	if err != nil {
		log.Fatal(err)
	}
}
