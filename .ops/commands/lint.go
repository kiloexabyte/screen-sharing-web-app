package commands

import (
	"context"
	"fmt"
	"log"

	"lesiw.io/command"
	"lesiw.io/command/sys"
	"lesiw.io/fs"
)

func (o Ops) Lint() error {
	sh := command.Shell(sys.Machine(), "golangci-lint", "go")
	ctx := fs.WithWorkDir(context.Background(), ".ops")

	if err := sh.Exec(ctx, "golangci-lint", "run"); err != nil {
		return fmt.Errorf("golangci-lint: %w", err)
	}

	if err := sh.Exec(ctx, "go", "fmt"); err != nil {
		return fmt.Errorf("go fmt: %w", err)
	}

	sh = command.Shell(sys.Machine(), "npx", "pnpm")
	ctx = context.Background()

	if err := o.Restore(pnpmCacheKey(), pnpmCachePaths); err != nil {
		log.Printf("cache restore: %v", err)
	}

	if err := sh.Exec(ctx, "pnpm", "install"); err != nil {
		return fmt.Errorf("pnpm install: %w", err)
	}

	if err := o.Save(pnpmCacheKey(), pnpmCachePaths); err != nil {
		log.Printf("cache save: %v", err)
	}

	if err := sh.Exec(ctx, "npx", "prettier", "--check", "./**/*.{js,jsx,mjs,cjs,ts,tsx,json,vue}"); err != nil {
		return fmt.Errorf("prettier: %w", err)
	}

	return nil
}
