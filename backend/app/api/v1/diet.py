from typing import Annotated

from fastapi import APIRouter, Query
from fastapi.responses import Response

from app.api.deps import DietServiceDep
from app.core.constants import DietType
from app.schemas.diet import DietConditionRead

router = APIRouter(prefix="/diet", tags=["diet"])


@router.get("/conditions", response_model=list[DietConditionRead])
def list_conditions(service: DietServiceDep):
    return service.list_conditions()


@router.get("/chart", response_class=Response, responses={200: {"content": {"application/pdf": {}}}})
def download_chart(
    service: DietServiceDep,
    condition: Annotated[str, Query(max_length=60)],
    diet_type: DietType,
    name: Annotated[str | None, Query(max_length=80)] = None,
) -> Response:
    filename, pdf = service.build_chart(condition, diet_type, name)
    return Response(
        content=pdf,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
