/**
 * Illustrated developer-at-desk avatar. Pure SVG; all colours come from the
 * active theme via CSS classes (see "Hero avatar" in globals.css).
 * Skin/hair colours: .av-skin / .av-hair.
 */
export default function Avatar() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg className="avatar" viewBox="0 0 400 380">
        {/* backdrop */}
        <circle className="av-blob" cx="200" cy="190" r="150" />

        {/* plant */}
        <g className="av-plant">
          <path className="av-leaf" d="M78 336 C60 316 58 296 66 282 C80 296 84 316 78 336Z" />
          <path className="av-leaf" d="M80 336 C88 310 102 300 116 298 C112 316 98 330 80 336Z" />
          <path className="av-leaf alt" d="M78 336 C70 318 74 300 84 290 C92 306 88 322 78 336Z" />
          <rect className="av-pot" x="62" y="334" width="34" height="32" rx="5" />
        </g>

        {/* person */}
        <g className="av-person">
          {/* curly hair: back volume (behind shoulders and face) */}
          <g className="av-hair">
            <ellipse cx="200" cy="188" rx="60" ry="74" />
            {[
              [166, 128, 24], [190, 114, 26], [216, 115, 26], [240, 128, 24],
              [148, 152, 22], [252, 152, 22], [140, 180, 22], [260, 180, 22],
              [140, 208, 22], [260, 208, 22], [146, 234, 21], [254, 234, 21],
            ].map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
            ))}
          </g>

          <path className="av-shirt" d="M104 340 Q106 252 200 246 Q294 252 296 340 Z" />
          <rect className="av-skin" x="187" y="214" width="26" height="40" rx="9" />
          <path className="av-skin" d="M180 248 Q200 268 220 248 Z" />

          {/* curls falling over the shoulders */}
          <g className="av-hair">
            {[
              [150, 256, 18], [250, 256, 18], [156, 278, 15], [244, 278, 15],
              [164, 296, 11], [236, 296, 11],
            ].map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
            ))}
          </g>
          <g className="av-curl">
            <path d="M142 250 q8 -10 16 0" />
            <path d="M242 250 q8 -10 16 0" />
            <path d="M150 274 q6 -8 12 0" />
            <path d="M238 274 q6 -8 12 0" />
            <path d="M132 200 q8 -10 16 0" />
            <path d="M252 200 q8 -10 16 0" />
            <path d="M134 226 q7 -9 14 0" />
            <path d="M252 226 q7 -9 14 0" />
          </g>

          <g className="av-head">
            <ellipse className="av-skin" cx="200" cy="180" rx="42" ry="49" />

            {/* front curls / fringe */}
            <g className="av-hair">
              {[
                [166, 146, 13], [181, 136, 15], [199, 132, 15], [217, 135, 15],
                [232, 145, 13], [158, 162, 11], [242, 162, 11], [156, 180, 9], [244, 180, 9],
              ].map(([cx, cy, r]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
              ))}
            </g>
            <g className="av-curl">
              <path d="M174 140 q7 -8 14 0" />
              <path d="M192 134 q7 -8 14 0" />
              <path d="M210 137 q7 -8 14 0" />
              <path d="M186 116 q8 -9 16 0" />
              <path d="M160 128 q7 -8 14 0" />
              <path d="M228 126 q7 -8 14 0" />
            </g>

            <circle className="av-earring" cx="157" cy="200" r="3.5" />
            <circle className="av-earring" cx="243" cy="200" r="3.5" />

            <circle className="av-cheek" cx="176" cy="202" r="7" />
            <circle className="av-cheek" cx="224" cy="202" r="7" />
            <path className="av-brow" d="M174 168 Q182 163 191 167" />
            <path className="av-brow" d="M209 167 Q218 163 226 168" />
            <g className="av-eyes">
              <ellipse className="av-eye" cx="183" cy="184" rx="3.6" ry="4.2" />
              <ellipse className="av-eye" cx="217" cy="184" rx="3.6" ry="4.2" />
              <path className="av-brow" d="M179.5 181 l-4 -2.5 M220.5 181 l4 -2.5" />
            </g>
            <path className="av-lips" d="M190 206 Q200 216 210 206 Q200 210 190 206 Z" />
          </g>
        </g>

        {/* laptop (back of the lid faces us) */}
        <rect className="av-laptop" x="118" y="262" width="164" height="100" rx="9" />
        <text className="av-logo" x="200" y="320" textAnchor="middle">
          {"</>"}
        </text>
        <rect className="av-cursor" x="226" y="300" width="3" height="24" rx="1" />
        <rect className="av-laptop-base" x="98" y="358" width="204" height="9" rx="4.5" />

        {/* mug with steam */}
        <g className="av-mug">
          <path className="av-steam" d="M312 322 q-6 -10 0 -18 q6 -8 0 -18" />
          <path className="av-steam s2" d="M324 322 q-6 -10 0 -18 q6 -8 0 -18" />
          <path className="av-mug-handle" d="M334 342 q12 0 12 10 q0 10 -12 10" />
          <rect className="av-mug-body" x="302" y="332" width="34" height="34" rx="6" />
        </g>

        <line className="av-desk" x1="40" y1="367" x2="360" y2="367" />
      </svg>

    </div>
  );
}
