#!/usr/bin/env bash
# Pollo Assistance de escritorio: instalar con un solo comando (22/11/2026).
# ============================================================
#   curl -fsSL https://polloassistance.github.io/instalar.sh | bash
#
# Sirve en Mac y en Linux. Baja la última versión de la página de descarga
# (descargas/escritorio.json) y:
#
#   macOS   la copia a Aplicaciones y la firma «ad hoc» en tu Mac. Así se abre
#           con doble clic, sin el paso de Ajustes → Privacidad → «Abrir igualmente».
#           Ojo, que es justo lo que este script se salta: macOS comprueba las apps
#           que bajas con el navegador, pero no las que baja `curl`. Por eso solo
#           hay que usarlo con este enlace, que es el nuestro.
#   Ubuntu, Debian, Mint, Pop!_OS…   instala el .deb con apt (pide tu contraseña).
#   Las demás (Fedora, Arch, openSUSE…)   el .tar.gz en tu carpeta personal, con
#           su icono en el menú (instalar.sh de dentro).
#
# Compatible con el bash 3.2 que trae macOS.
set -euo pipefail

INDICE="https://polloassistance.github.io/descargas/escritorio.json"

decir() { printf '%s\n' "$*"; }
fallar() { printf 'No se ha podido instalar: %s\n' "$*" >&2; exit 1; }

command -v curl >/dev/null 2>&1 || fallar "hace falta «curl»."
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

decir "Mirando cuál es la última versión…"
JSON="$(curl -fsSL "$INDICE" | tr -d '\r\n')" || fallar "no se puede leer $INDICE (¿hay internet?)."
BASE="$(printf '%s' "$JSON" | sed -n 's/.*"base" *: *"\([^"]*\)".*/\1/p')"
VERSION="$(printf '%s' "$JSON" | sed -n 's/.*"version" *: *"\([^"]*\)".*/\1/p')"
[ -n "$BASE" ] || fallar "la página de descarga no dice de dónde bajarla."
case "$BASE" in https://github.com/Polloassistance/*) ;; *) fallar "dirección de descarga inesperada: $BASE" ;; esac

# El nombre del archivo de una plataforma («linux», «linux-deb», «mac-arm64»…).
archivo() { printf '%s' "$JSON" | sed -n "s/.*\"$1\" *: *{ *\"nombre\" *: *\"\([^\"]*\)\".*/\1/p"; }

bajar() {   # bajar <nombre> → $TMP/<nombre>
    decir "Bajando $1…"
    curl -fL --progress-bar -o "$TMP/$1" "$BASE$1" || fallar "no se ha podido bajar $1."
}

instalar_mac() {
    local chip clave nombre destino app
    chip="$(uname -m)"
    if [ "$chip" = "arm64" ]; then clave=mac-arm64; else clave=mac-x64; fi
    nombre="$(archivo "$clave")"
    [ -n "$nombre" ] || fallar "no hay versión para Mac con $chip."
    bajar "$nombre"
    mkdir -p "$TMP/app"
    ditto -x -k "$TMP/$nombre" "$TMP/app" || fallar "no se ha podido descomprimir."
    app="$TMP/app/Pollo Assistance.app"
    [ -d "$app" ] || fallar "el .zip no trae «Pollo Assistance.app»."

    # A Aplicaciones si se puede escribir ahí; si no (usuario sin permisos), a ~/Applications.
    if [ -w /Applications ]; then destino="/Applications"; else destino="$HOME/Applications"; mkdir -p "$destino"; fi
    osascript -e 'quit app "Pollo Assistance"' >/dev/null 2>&1 || true
    rm -rf "$destino/Pollo Assistance.app"
    mv "$app" "$destino/"
    app="$destino/Pollo Assistance.app"

    # Sin firmar no arranca en los Mac con chip de Apple: se firma «ad hoc» en este Mac.
    xattr -cr "$app" 2>/dev/null || true
    codesign --force --deep --sign - "$app" >/dev/null 2>&1 || fallar "no se ha podido firmar la app en este Mac (codesign)."
    decir "Instalada en $destino. Abriéndola…"
    open "$app" || true
}

instalar_linux() {
    local nombre
    [ "$(uname -m)" = "x86_64" ] || fallar "por ahora solo hay versión para Linux de 64 bits con Intel o AMD (x86_64); el tuyo es $(uname -m)."
    if command -v apt-get >/dev/null 2>&1 && command -v dpkg >/dev/null 2>&1; then
        nombre="$(archivo linux-deb)"
        if [ -n "$nombre" ]; then
            bajar "$nombre"
            # apt lee el archivo como el usuario _apt: que pueda.
            chmod 755 "$TMP"; chmod 644 "$TMP/$nombre"
            decir "Instalando el paquete (pide tu contraseña)…"
            # </dev/null: con «curl | bash» la entrada es el propio script, y apt o
            # dpkg no deben comérsela (la contraseña, sudo la pide por la terminal).
            sudo apt-get install -y "$TMP/$nombre" </dev/null || fallar "apt no ha podido instalar el paquete."
            decir "Listo: busca «Pollo Assistance» en tus aplicaciones."
            return
        fi
    fi
    nombre="$(archivo linux)"
    [ -n "$nombre" ] || fallar "no hay versión para Linux."
    bajar "$nombre"
    mkdir -p "$TMP/app"
    tar -xzf "$TMP/$nombre" -C "$TMP/app" || fallar "no se ha podido descomprimir."
    local dir
    dir="$(find "$TMP/app" -maxdepth 2 -name instalar.sh -print -quit)"
    [ -n "$dir" ] || fallar "esta versión no trae instalar.sh (es anterior a la 0.1.4)."
    bash "$dir" </dev/null
}

decir "Pollo Assistance $VERSION"
case "$(uname -s)" in
    Darwin) instalar_mac ;;
    Linux)  instalar_linux ;;
    *)      fallar "este instalador es para Mac y Linux. En Windows, baja el instalador de https://polloassistance.github.io/escritorio.html" ;;
esac
