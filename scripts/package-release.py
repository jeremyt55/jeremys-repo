from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
import hashlib
html=Path('Luma.html').read_bytes()
Path('releases/Luma-Toybox-Adventure.html').write_bytes(html)
text="""LUMA - TOYBOX ADVENTURE

Extract the ZIP and open Luma.html in a recent desktop browser.
Click Enter Andy's room or Continue adventure.
The game works offline. Keep a copy on your computer.

CONTROLS
WASD move; mouse or left/right arrows look without clicking.
Space jump (hold to glide), Shift dash, click/F wrist laser.
E talk/use/park RC, R play with a nearby toy, M Toybox, P pause.
Touch devices use movement/action buttons and drag-to-look.

FORKY
Open Toybox > Forky. Choose a part, then tap/click the face to place it.
You can drag parts or use the move/rotate buttons. Original look resets.

ZURG'S ROOM REWRITER
Meet Woody for the rescue plan. Climb to Jessie and clear six rope jumps.
Decode Rex's arcade or use BLUE > RED > GOLD (floor blocks 2, 1, 3).
Reach the desk and use the claw to carry three aliens to the rescue bay.
Install all three power cells at the castle relay, west of Zurg's fort.
Shoot the three glowing shield anchors. Then wait for openings in the
visible dome and fire at Zurg's chest. Dodge the charging cannon.
Zurg cuts the lights and fires wider spreads when his armor is low.
Return to Woody after the Room Rewriter is powered down.

Every toy has a different activity. Open the Toybox to explore all 20.
Progress saves locally in this browser. No countdown limits exploration.
This is stylized fan-made game art; no movie-production assets are included.
"""
for name in ['Luma-Playable.zip','Luma-Toybox-Adventure.zip']:
    with ZipFile(Path('releases')/name,'w',ZIP_DEFLATED,compresslevel=9) as z:
        z.writestr('Luma.html',html)
        z.writestr('START HERE.txt',text)
    with ZipFile(Path('releases')/name) as z:
        assert z.testzip() is None and z.read('Luma.html')==html
print('Release verified:',hashlib.sha256(html).hexdigest())
