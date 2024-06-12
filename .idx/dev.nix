{ pkgs }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.bun
  ];
  idx.extensions = [
    "angular.ng-template"
  ];
  idx.workspace.onCreate = {
    npm-install = "bun install";
  };
  idx.previews = {
    previews = {
      web = {
        command = [
          "bun"
          "run"
          "start"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
          "--disable-host-check"
        ];
        manager = "web";
      };
    };
  };
}
