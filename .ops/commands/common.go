package commands

import (
	"context"

	"lesiw.io/command"
)

func useNpmOrPnpm(ctx context.Context, sh *command.Sh) string {
	// GH actions runner come with npm pre installed, but pnpm is used for local development
	if err := sh.Exec(ctx, "pnpm", "--version"); err == nil {
		return "pnpm"
	}

	return "npm"
}
