# Fix Windows native binaries for pnpm on Windows
$root = "D:\Photo-Studio-Pro\Photo-Studio-Pro\node_modules\.pnpm"

# Fix rollup
$rollupDest = "$root\rollup@4.59.0\node_modules\@rollup"
New-Item -ItemType Directory -Force $rollupDest | Out-Null
Copy-Item -Recurse -Force "$root\@rollup+rollup-win32-x64-msvc@4.59.0\node_modules\@rollup\rollup-win32-x64-msvc" "$rollupDest\rollup-win32-x64-msvc"

# Fix lightningcss
$lightningNode = "$root\lightningcss@1.31.1\node_modules\lightningcss\node"
$lightningSource = "$root\lightningcss-win32-x64-msvc@1.31.1\node_modules\lightningcss-win32-x64-msvc\lightningcss.win32-x64-msvc.node"
Copy-Item -Force $lightningSource "$lightningNode\lightningcss.win32-x64-msvc.node"

# Fix tailwindcss oxide
$oxideDest = "$root\@tailwindcss+oxide@4.2.1\node_modules\@tailwindcss\oxide-win32-x64-msvc"
New-Item -ItemType Directory -Force $oxideDest | Out-Null
Copy-Item -Recurse -Force "$root\@tailwindcss+oxide-win32-x64-msvc@4.2.1\node_modules\@tailwindcss\oxide-win32-x64-msvc" "$root\@tailwindcss+oxide@4.2.1\node_modules\@tailwindcss\oxide-win32-x64-msvc"

Write-Host "All Windows binaries fixed!" -ForegroundColor Green